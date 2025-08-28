import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type {Avaliacao, Pergunta, Resposta} from "../../types/formulario.ts";
import './ResponderFormulario.css';
import {buscarAvaliacaoPorId, criarAvaliacao} from "../../services/avaliacaoService.ts";


const ResponderFormulario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);
  const [respostas, setRespostas] = useState<Record<number, Resposta>>({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarFormulario = async () => {
      try {
        //convertendo para number
        const idForm = Number(id);
        const dadosAvaliacao = await buscarAvaliacaoPorId(idForm);
        setAvaliacao(dadosAvaliacao);
      } catch (error) {
        // Tratamento de erro adequado pode ser adicionado aqui
      } finally {
        setLoading(false);
      }
    };

    carregarFormulario();
  }, [id]);



  const handleChange = (pergunta: Pergunta, value: string | number) => {
    setRespostas(prev => {
      const resposta: Resposta = {
        perguntaId: pergunta.id,
        resposta: pergunta.tipoResposta,
        respostaTexto: pergunta.tipoResposta === 'DISSERTATIVA' ? String(value) : '',
        alternativaIds: pergunta.tipoResposta === 'ESCOLHA_UNICA' ? [Number(value)] : [],
      };
      return { ...prev, [pergunta.id]: resposta };
    });
  };

  const validateForm = () => {
    let valid = true;
    if (!avaliacao) return false;
    avaliacao.respostas.filter(r => r.pergunta.ativo).forEach(resposta => {
        if (!resposta) valid = false;
        if (resposta.resposta === 'ESCOLHA_UNICA' && (!resposta?.alternativas.length)) valid = false;
        if (resposta.resposta === 'DISSERTATIVA' && !resposta?.respostaTexto?.trim()) valid = false;
    });
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!validateForm()) {
      setErrorMsg('Preencha todos os campos obrigatórios.');
      return;
    }
    // Exemplo fixo de alunoId e profissionalAvaliadorId
    const payload = {
      alunoId: avaliacao?.aluno.id,
      profissionalAvaliadorId: avaliacao?.profissionalAvaliador.id,
      dataCadastro: new Date().toISOString().slice(0, 10),
      respostas: Object.values(respostas),
      ativo: true,
    };
    try {
      await criarAvaliacao(payload);
      setSuccess(true);
    } catch (err) {
      setErrorMsg('Erro ao enviar. Tente novamente.');
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!avaliacao) return <div>Formulário não encontrado.</div>;
  if (avaliacao?.id > 0) {
    return (
      <div className="formulario-container">
        <h2 className="formulario-titulo">{avaliacao.formulario}</h2>
        <div className="formulario-header">
          <div className="formulario-dados-header">
            <div><b>Aluno:</b> {avaliacao.aluno.pessoa.nome}</div>
            <div><b>Instituição de Ensino:</b> {avaliacao.aluno.instituicaoEnsino.nome}</div>
            <div><b>Profissional Avaliador:</b> {avaliacao.profissionalAvaliador.pessoa.nome}</div>
            <div><b>Data da Avaliação:</b> {avaliacao.dataCadastro}</div>
          </div>
        </div>
        <div><br /><br /></div>
        <form className="formulario-avaliacao" style={{ pointerEvents: 'none', opacity: 0.95 }}>
          {avaliacao.respostas?.map(resposta => (
            <section key={resposta.categoria.id} className="categoria-section">
              <h3 className="categoria-titulo">{resposta.categoria.nome}</h3>
                <div key={resposta.pergunta.id} className="pergunta-box">
                  {resposta.pergunta.tipoResposta === 'ESCOLHA_UNICA' ? (
                    <fieldset className="pergunta-fieldset">
                      <legend className="pergunta-legend">
                        <label htmlFor={`pergunta_${resposta.pergunta.id}`}><b>{resposta.pergunta.texto}</b></label>
                      </legend>
                      <div className="alternativas-group">
                        {resposta.alternativas.filter(a => a.ativo).map(alt => (
                          <label key={alt.id} className="alternativa-label">
                            <input
                              type="radio"
                              id={`alt_${alt.id}`}
                              name={`pergunta_${resposta.pergunta.id}`}
                              value={alt.id}
                              checked={true}
                              readOnly
                              disabled
                            />
                            {alt.texto}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : (
                    <div className="pergunta-dissertativa">
                      <label htmlFor={`pergunta_${resposta.pergunta.id}`} className="pergunta-label">
                        <b>{resposta.pergunta.texto}</b>
                      </label>
                      <textarea
                        id={`pergunta_${resposta.pergunta.id}`}
                        className="textarea-dissertativa"
                        style={{ width: '100%', minHeight: 60 }}
                        value={respostas[resposta.pergunta.id]?.respostaTexto || ''}
                        readOnly
                        disabled
                      />
                    </div>
                  )}
                </div>
              </section>
          ))}
        </form>
        <button type="button" className="botao-enviar" onClick={() => navigate(-1)} aria-label="Voltar">Voltar</button>
      </div>
    );
  }

  return (
    <div className="formulario-container">
      <h2 className="formulario-titulo">{avaliacao.formulario}</h2>
      <form className="formulario-avaliacao" onSubmit={handleSubmit} noValidate>
        {avaliacao.respostas?.map(resposta => (
          <section key={resposta.categoria.id} className="categoria-section">
            <h3 className="categoria-titulo">{resposta.categoria.nome}</h3>
              <div key={resposta.pergunta.id} className="pergunta-box">
                {resposta.pergunta.tipoResposta === 'ESCOLHA_UNICA' ? (
                  <fieldset className="pergunta-fieldset">
                    <legend className="pergunta-legend">
                      <label htmlFor={`pergunta_${resposta.pergunta.id}`}><b>{resposta.pergunta.texto}</b></label>
                    </legend>
                    <div className="alternativas-group">
                      {resposta.alternativas.filter(a => a.ativo).map(alt => (
                        <label key={alt.id} className="alternativa-label">
                          <input
                            type="radio"
                            id={`alt_${alt.id}`}
                            name={`pergunta_${resposta.pergunta.id}`}
                            value={alt.id}
                            checked={respostas[resposta.pergunta.id]?.alternativaIds[0] === alt.id}
                            onChange={() => handleChange(resposta.pergunta, alt.id)}
                            required
                            aria-required="true"
                          />
                          {alt.texto}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ) : (
                  <div className="pergunta-dissertativa">
                    <label htmlFor={`pergunta_${resposta.pergunta.id}`} className="pergunta-label">
                      <b>{resposta.pergunta.texto}</b>
                    </label>
                    <textarea
                      id={`pergunta_${resposta.pergunta.id}`}
                      className="textarea-dissertativa"
                      style={{ width: '100%', minHeight: 60 }}
                      value={respostas[resposta.pergunta.id]?.respostaTexto || ''}
                      onChange={e => handleChange(resposta.pergunta, e.target.value)}
                      required
                      aria-required="true"
                      aria-label={resposta.pergunta.texto}
                    />
                  </div>
                )}
              </div>
          </section>
        ))}
        {errorMsg && <div className="mensagem-erro" role="alert">{errorMsg}</div>}
        {success && <div className="mensagem-sucesso" role="status">Formulário enviado com sucesso!</div>}
        <button type="submit" className="botao-enviar" aria-label="Enviar avaliação">Enviar</button>
      </form>
    </div>
  );
};

export default ResponderFormulario;
