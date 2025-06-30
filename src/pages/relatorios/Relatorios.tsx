import React from 'react';
import { Card, DashboardContainer, StatsGrid } from '../../components/layout/DefaultComponents.tsx';
import { Link } from 'react-router-dom';

const relatorios = [
	{
		nome: 'Alunos por Instituição de Ensino',
		descricao: 'Lista todos os alunos agrupados por suas instituições de ensino.',
		rota: '/relatorios/alunos-por-instituicao',
		componente: '/relatorios/relatorio-alunos-pdf', // nova rota para o PDF
	},
	{
		nome: 'Alunos por Município',
		descricao: 'Gera um relatório de alunos agrupados por município.',
		rota: '/relatorios/alunos-por-municipio',
	},
];

const Relatorios: React.FC = () => {
	return (
		<DashboardContainer>
			<h2>Relatórios Disponíveis</h2>
			<StatsGrid>
				{relatorios.map((relatorio) => (
					<Card key={relatorio.nome} style={{ minHeight: 180 }}>
						<h3>{relatorio.nome}</h3>
						<p>{relatorio.descricao}</p>
						<Link
							to={relatorio.componente || relatorio.rota}
							style={{
								marginTop: 16,
								display: 'inline-block',
								color: '#0ea5e9',
							}}
						>
							Gerar Relatório
						</Link>
					</Card>
				))}
			</StatsGrid>
		</DashboardContainer>
	);
};

export default Relatorios;

