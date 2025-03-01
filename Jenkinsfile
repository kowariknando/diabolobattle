pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                // might skip checkout if you put Dockerfile in Jenkins
            }
        }
        stage('Build minimal Docker Image') {
            steps {
                sh 'docker build -t test-alpine .'
            }
        }
    }
}
