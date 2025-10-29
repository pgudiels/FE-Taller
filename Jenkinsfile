pipeline {
  agent any
  tools { 
    nodejs 'Node20'     // <-- cambia a 'NodeJS' si ese es tu nombre
  }
  options { skipDefaultCheckout(true) }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        bat 'node -v & npm -v'
      }
    }

    stage('Install deps') {
      steps {
        // Usamos install para evitar problemas si el lock se vuelve a desalinear
        bat 'npm install'
      }
      post {
        success {
          archiveArtifacts artifacts: 'package-lock.json', onlyIfSuccessful: true
        }
      }
    }

    stage('Build') {
      steps {
        bat 'npm run build'
      }
      post {
        always {
          archiveArtifacts artifacts: 'dist/**', onlyIfSuccessful: true
        }
      }
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
  }
}
