pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
            sh 'sleep 1'
            }
        }
        stage('Build minimal Docker Image') {
            steps {
                sh 'docker build -t test-alpine .'
            }
        }
    }
}
