pipeline {
    agent any  // or agent { docker { image 'node:18' } }

    stages {
        stage('Checkout') {
            steps {
                // Clones the code from your GitHub (though Jenkins does this automatically).
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                // Installs dependencies for your MERN app
                sh 'npm install'
            }
        }
        stage('Run Postman Tests') {
            steps {
                // If newman is not installed globally:
                sh 'npm install -g newman'
                // Adjust path to your collection if needed:
                sh 'newman run tests/myapp.postman_collection.json'
            }
        }
        stage('Build Docker Image') {
            steps {
                // If you’re using Docker, build with your Dockerfile
                // (Make sure your Dockerfile has EXPOSE 5000 if your server runs on 5000)
                sh 'docker build -t my-mern-app .'
            }
        }
        stage('Run Container') {
            steps {
                script {
                    // Stop existing container if it’s running
                    sh '''
                    if [ "$(docker ps -q -f name=my-mern-app-container)" ]; then
                        docker stop my-mern-app-container
                        docker rm my-mern-app-container
                    fi
                    '''
                }
                // Run new container, mapping port 5000 on the host to port 5000 in the container
                sh 'docker run -d -p 5000:5000 --name my-mern-app-container my-mern-app'
            }
        }
    }
    post {
        always {
            // Clean up Jenkins workspace
            cleanWs()
        }
    }
}
