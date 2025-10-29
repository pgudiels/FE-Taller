pipeline {
  agent any
  tools { nodejs 'Node20' }  // o el nombre que configuraste: NodeJS
  options { skipDefaultCheckout(true) }
  stages {
    stage('Checkout') {
      steps { checkout scm; bat 'node -v & npm -v' }
    }
    stage('Install deps') {
      steps {
        // Forzar instalación normal y regenerar lock
        bat 'npm install'
      }
      post {
        success {
          // opcional: publicar el lock regenerado como artefacto para revisarlo
          archiveArtifacts artifacts: 'package-lock.json', onlyIfSuccessful: true
        }
      }
    }
    stage('Build') {
      steps { bat 'npm run build' }
      post { always { archiveArtifacts artifacts: 'dist/**', onlyIfSuccessful: true } }
    }
stage('SonarQube') {
  steps {
    withSonarQubeEnv('My SonarQube') {
      bat '''
        %SONAR_SCANNER_HOME%\\bin\\sonar-scanner.bat ^
          -Dsonar.projectKey=fe-taller ^
          -Dsonar.projectName="FE Taller" ^
          -Dsonar.sources=src ^
          -Dsonar.exclusions=**/node_modules/**,dist/**,**/*.test.*,**/*.spec.*,**/vite.config.*
      '''
    }
  }
}
