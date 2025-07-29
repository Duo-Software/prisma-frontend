import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Exemplo de logotipo (pode substituir por outro caminho)
import logo from '../../assets/logo_prisma_01.png';
import { mockAlunos } from '../../mocks/alunos-mock';

// Mock de dados da instituição
const instituicao = {
  nome: 'Instituto de Ensino Exemplo',
  cnpj: '12.345.678/0001-99',
  endereco: 'Rua das Flores, 123 - Centro, Cidade/UF',
};

// Mock de alunos
const alunos = mockAlunos;

const RelatorioAlunosPdf: React.FC = () => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const gerarPdf = async () => {
    if (!pdfRef.current) return;
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    // Rodapé
    pdf.setFontSize(10);
    pdf.text('Este relatório foi gerado automaticamente pelo Sistema Prisma.', pageWidth / 2, pageHeight - 10, { align: 'center' });
    pdf.text(`Página 1 de 1`, pageWidth - 40, pageHeight - 5);
    pdf.save('relatorio-alunos.pdf');
  };

  const dataAtual = new Date().toLocaleDateString();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <button onClick={gerarPdf} style={{ marginBottom: 24, padding: '8px 20px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        Gerar PDF
      </button>
      <div ref={pdfRef} style={{ background: '#fff', color: '#222', padding: 32, fontFamily: 'Arial, sans-serif', fontSize: 14 }}>
        {/* Cabeçalho */}
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: 16, marginBottom: 16 }}>
          <img src={logo} alt="Logo" style={{ width: 60, marginRight: 24 }} />
          <div>
            <h2 style={{ margin: 0 }}>Relatório de Alunos</h2>
            <div style={{ fontSize: 16, fontWeight: 500 }}>{instituicao.nome}</div>
            <div style={{ fontSize: 12, color: '#666' }}>Data de emissão: {dataAtual}</div>
          </div>
        </div>
        {/* Dados da instituição */}
        <div style={{ marginBottom: 20 }}>
          <strong>Instituição:</strong> {instituicao.nome}<br />
          <strong>CNPJ:</strong> {instituicao.cnpj}<br />
          <strong>Endereço:</strong> {instituicao.endereco}
        </div>
        {/* Tabela de alunos */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
          <thead>
            <tr style={{ background: '#f3f3f3' }}>
              <th style={{ border: '1px solid #ccc', padding: 6 }}>Nº</th>
              <th style={{ border: '1px solid #ccc', padding: 6 }}>Nome completo</th>
              <th style={{ border: '1px solid #ccc', padding: 6 }}>Data de nascimento</th>
              <th style={{ border: '1px solid #ccc', padding: 6 }}>CPF</th>
              <th style={{ border: '1px solid #ccc', padding: 6 }}>Matrícula</th>
              <th style={{ border: '1px solid #ccc', padding: 6 }}>Data Ingresso</th>
              <th style={{ border: '1px solid #ccc', padding: 6 }}>Data Egresso</th>
              <th style={{ border: '1px solid #ccc', padding: 6 }}>Situação</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno, idx) => (
              <tr key={aluno.matricula}>
                <td style={{ border: '1px solid #ccc', padding: 6, textAlign: 'center' }}>{idx + 1}</td>
                <td style={{ border: '1px solid #ccc', padding: 6 }}>{aluno.pessoa.nome}</td>
                <td style={{ border: '1px solid #ccc', padding: 6, textAlign: 'center' }}>{aluno.pessoa.dataNascimento ? new Date(aluno.pessoa.dataNascimento).toLocaleDateString('pt-BR') : '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 6 }}>{aluno.pessoa.cpf}</td>
                <td style={{ border: '1px solid #ccc', padding: 6 }}>{aluno.matricula}</td>
                <td style={{ border: '1px solid #ccc', padding: 6, textAlign: 'center' }}>{aluno.dataIngresso ? new Date(aluno.dataIngresso).toLocaleDateString('pt-BR') : '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 6, textAlign: 'center' }}>{aluno.dataEgresso ? new Date(aluno.dataEgresso).toLocaleDateString('pt-BR') : '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 6 }}>{aluno.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Rodapé visual (não vai para o PDF, só para visualização) */}
        <div style={{ textAlign: 'center', color: '#888', fontSize: 12, marginTop: 32 }}>
          Este relatório foi gerado automaticamente pelo Sistema Prisma.
        </div>
      </div>
    </div>
  );
};

export default RelatorioAlunosPdf;
