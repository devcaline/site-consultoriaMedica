// Sistema de versionamento para documentos legais
export interface LegalDocumentVersion {
  version: string;
  date: string;
  changes: string[];
}

export const legalVersions = {
  privacyPolicy: {
    current: "1.0",
    versions: [
      {
        version: "1.0",
        date: "2024-01-15",
        changes: [
          "Versão inicial da política de privacidade",
          "Definição de coleta e uso de dados pessoais",
          "Estabelecimento de direitos do usuário"
        ]
      }
    ]
  },
  termsOfUse: {
    current: "1.0", 
    versions: [
      {
        version: "1.0",
        date: "2024-01-15",
        changes: [
          "Versão inicial dos termos de uso",
          "Definição de serviços e elegibilidade",
          "Estabelecimento de responsabilidades e limitações"
        ]
      }
    ]
  }
};

export const getCurrentVersion = (document: 'privacy' | 'terms'): string => {
  return document === 'privacy' 
    ? legalVersions.privacyPolicy.current 
    : legalVersions.termsOfUse.current;
};

export const getVersionHistory = (document: 'privacy' | 'terms'): LegalDocumentVersion[] => {
  return document === 'privacy' 
    ? legalVersions.privacyPolicy.versions 
    : legalVersions.termsOfUse.versions;
};
