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
      environment {
        SONARQUBE_URL = 'http://localhost:9000'
        SONAR_TOKEN = credentials('SONAR_TOKEN')
      }
      steps {
        bat '''
          sonar-scanner ^
            -Dsonar.projectKey=fe-taller ^
            -Dsonar.projectName="FE Taller" ^
            -Dsonar.sources=src ^
            -Dsonar.exclusions=**/node_modules/**,dist/**,**/*.test.*,**/*.spec.*,**/vite.config.* ^
            -Dsonar.host.url=%SONARQUBE_URL% ^
            -Dsonar.login=%SONAR_TOKEN%
        '''
      }
    }
  }
}
