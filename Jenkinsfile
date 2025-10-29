pipeline {
  agent any

  tools {
    nodejs 'Node20'
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
            "C:\\Sonarscanner\\bin\\sonar-scanner.bat" ^
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
