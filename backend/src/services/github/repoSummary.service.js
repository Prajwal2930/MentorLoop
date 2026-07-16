const createRepositorySummary = (repository) => ({
  name: repository.repositoryName,
  description: repository.repositoryDescription,
  languages: repository.languages,
  readme: repository.readme.slice(0, 8000),
  folderStructure: repository.folderStructure.slice(0, 150),
  importantConfigFiles: repository.importantConfigFiles,
});

module.exports = { createRepositorySummary };
