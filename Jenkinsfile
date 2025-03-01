pipeline {
    agent {
        // We'll build and run in Jenkins's Docker or on the local node if Docker is installed
        // "any" means run on any available Jenkins agent
        any
    }
    stages {
        stage('Checkout') {
            steps {
                // Clones your GitHub repository
                git branch: 'main', url: 'https://github.com/kowariknando/diabolobattle.git'
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
                // Install newman (if not installed globally)
                sh 'npm install -g newman'
                // Run your Postman collection
                sh 'newman run tests/myapp.postman_collection.json'
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build Docker image based on Dockerfile in this repo
                sh 'docker build -t my-mern-app .'
            }
        }
        stage('Run Container') {
            steps {
                // Stop any existing container
                script {
                    sh '''
                    if [ "$(docker ps -q -f name=my-mern-app-container)" ]; then
                        docker stop my-mern-app-container
                        docker rm my-mern-app-container
                    fi
                    '''
                }
                // Run new container
                sh 'docker run -d -p 5000:5000 --name my-mern-app-container my-mern-app'
            }
        }
    }
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}
