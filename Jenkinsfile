pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-mern-app .'
            }
        }
        stage('Run Container') {
            steps {
                script {
                    sh '''
                    if [ "$(docker ps -q -f name=my-mern-app-container)" ]; then
                        docker stop my-mern-app-container
                        docker rm my-mern-app-container
                    fi
                    '''
                }
                sh 'docker run -d -p 5000:5000 --name my-mern-app-container my-mern-app'
            }
        }
        stage('Run Postman Tests') {
            steps {
                sh 'npm install newman'
                sh 'sleep 5'
                sh 'npx newman run tests/myapp.postman_collection.json'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
