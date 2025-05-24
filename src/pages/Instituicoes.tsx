import React, {useState} from "react";
import {
    DashboardContainer,
    Card,
    StatContent,
    StatValue,
    StatLabel,
    StatsGrid, DefaultContainer, CardTitle, StatChange
} from "../components/layout/DefaultComponents.tsx";
import {mockInstitutions} from "../mocks/instituicoes-mock.ts";


const Instituicoes: React.FC = () => {
    const [institutions] = useState(mockInstitutions);

    return (

        <DefaultContainer>
            <CardTitle>
                <h1>Instituições de Ensino</h1>
                <br/>
            </CardTitle>

            <DashboardContainer>
                {institutions.map((institution) => (
                    <StatsGrid>
                        <Card key={institution.id} style={{marginBottom: '1rem'}}>
                            <StatContent>
                                <StatValue>{institution.nome}</StatValue>
                                <StatLabel>{institution.municipio.nome}-{institution.municipio.uf}</StatLabel>
                                <StatLabel>Tipo: {institution.tipoInstituicaoEnsino}</StatLabel>
                                <StatLabel>Alunos: {institution.totalAlunos}</StatLabel>
                                <StatLabel>
                                    Status:<StatChange $isPositive={institution.ativo}>
                                    {institution.ativo ? ' Ativo' : ' Inativo'}
                                </StatChange>
                                </StatLabel>
                            </StatContent>
                        </Card>
                    </StatsGrid>
                ))}
            </DashboardContainer>
        </DefaultContainer>
    );
};

export default Instituicoes;