import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type {Formulario, Pergunta, Resposta} from "../../types/formulario.ts";
import {buscarFormularioPorId} from "../../services/formularioService.ts";
import './ResponderFormulario.css';
import {criarAvaliacao} from "../../services/avaliacaoService.ts";


const ResponderFormulario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formulario, setFormulario] = useState<Formulario | null>(null);
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
        const dadosFormulario = await buscarFormularioPorId(idForm);
        setFormulario(dadosFormulario);
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
    if (!formulario) return false;
    formulario.categorias.forEach(categoria => {
      categoria.perguntas.filter(p => p.ativo).forEach(pergunta => {
        const resposta = respostas[pergunta.id];
        if (!resposta) valid = false;
        if (pergunta.tipoResposta === 'ESCOLHA_UNICA' && (!resposta?.alternativaIds.length)) valid = false;
        if (pergunta.tipoResposta === 'DISSERTATIVA' && !resposta?.respostaTexto?.trim()) valid = false;
      });
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
      alunoId: 10000,
      profissionalAvaliadorId: 1,
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
  if (!formulario) return <div>Formulário não encontrado.</div>;
  if (success) {
    return (
      <div className="formulario-container">
        <h2 className="formulario-titulo">{formulario.nomeFormulario}</h2>
        <div className="formulario-header">
          <div className="formulario-dados-header">
            <div><b>Aluno:</b> Laura Cristina Moreira</div>
            <div><b>Instituição de Ensino:</b> Colégio Estadual São Jorge</div>
            <div><b>Profissional Avaliador:</b> Jose Mario Gutierres</div>
            <div><b>Data da Avaliação:</b> {new Date().toLocaleString('pt-BR')}</div>
          </div>
        </div>
        <div><br /><br /></div>
        <form className="formulario-avaliacao" style={{ pointerEvents: 'none', opacity: 0.95 }}>
          {formulario.categorias?.map(categoria => (
            <section key={categoria.id} className="categoria-section">
              <h3 className="categoria-titulo">{categoria.nome}</h3>
              {categoria.perguntas.filter(p => p.ativo).map(pergunta => (
                <div key={pergunta.id} className="pergunta-box">
                  {pergunta.tipoResposta === 'ESCOLHA_UNICA' ? (
                    <fieldset className="pergunta-fieldset">
                      <legend className="pergunta-legend">
                        <label htmlFor={`pergunta_${pergunta.id}`}><b>{pergunta.texto}</b> <span className="obrigatorio">*</span></label>
                      </legend>
                      <div className="alternativas-group">
                        {pergunta.alternativas.filter(a => a.ativo).map(alt => (
                          <label key={alt.id} className="alternativa-label">
                            <input
                              type="radio"
                              id={`alt_${alt.id}`}
                              name={`pergunta_${pergunta.id}`}
                              value={alt.id}
                              checked={respostas[pergunta.id]?.alternativaIds[0] === alt.id}
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
                      <label htmlFor={`pergunta_${pergunta.id}`} className="pergunta-label">
                        <b>{pergunta.texto}</b> <span className="obrigatorio">*</span>
                      </label>
                      <textarea
                        id={`pergunta_${pergunta.id}`}
                        className="textarea-dissertativa"
                        style={{ width: '100%', minHeight: 60 }}
                        value={respostas[pergunta.id]?.respostaTexto || ''}
                        readOnly
                        disabled
                      />
                    </div>
                  )}
                </div>
              ))}
            </section>
          ))}
        </form>
        <div className="mensagem-sucesso" role="status">Formulário enviado com sucesso!</div>
        <button type="button" className="botao-enviar" onClick={() => navigate(-1)} aria-label="Voltar">Voltar</button>
      </div>
    );
  }

  return (
    <div className="formulario-container">
      <h2 className="formulario-titulo">{formulario.nomeFormulario}</h2>
      <form className="formulario-avaliacao" onSubmit={handleSubmit} noValidate>
        {formulario.categorias?.map(categoria => (
          <section key={categoria.id} className="categoria-section">
            <h3 className="categoria-titulo">{categoria.nome}</h3>
            {categoria.perguntas.filter(p => p.ativo).map(pergunta => (
              <div key={pergunta.id} className="pergunta-box">
                {pergunta.tipoResposta === 'ESCOLHA_UNICA' ? (
                  <fieldset className="pergunta-fieldset">
                    <legend className="pergunta-legend">
                      <label htmlFor={`pergunta_${pergunta.id}`}><b>{pergunta.texto}</b> <span className="obrigatorio">*</span></label>
                    </legend>
                    <div className="alternativas-group">
                      {pergunta.alternativas.filter(a => a.ativo).map(alt => (
                        <label key={alt.id} className="alternativa-label">
                          <input
                            type="radio"
                            id={`alt_${alt.id}`}
                            name={`pergunta_${pergunta.id}`}
                            value={alt.id}
                            checked={respostas[pergunta.id]?.alternativaIds[0] === alt.id}
                            onChange={() => handleChange(pergunta, alt.id)}
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
                    <label htmlFor={`pergunta_${pergunta.id}`} className="pergunta-label">
                      <b>{pergunta.texto}</b> <span className="obrigatorio">*</span>
                    </label>
                    <textarea
                      id={`pergunta_${pergunta.id}`}
                      className="textarea-dissertativa"
                      style={{ width: '100%', minHeight: 60 }}
                      value={respostas[pergunta.id]?.respostaTexto || ''}
                      onChange={e => handleChange(pergunta, e.target.value)}
                      required
                      aria-required="true"
                      aria-label={pergunta.texto}
                    />
                  </div>
                )}
              </div>
            ))}
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
