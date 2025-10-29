pipeline {
  agent any
  tools { nodejs 'Node20' }  // usa el nombre del tool que configuraste
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
        bat 'if exist package-lock.json ( npm ci ) else ( npm install )'
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
      environment {
        SONARQUBE_URL = 'http://localhost:9000'
        SONAR_TOKEN = credentials('SONAR_TOKEN')
      }
      steps {
        // Requiere sonar-scanner en PATH. Si no lo tienes, dime y te paso la variante con el plugin.
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
