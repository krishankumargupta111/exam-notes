
pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'krishankumargupta/exam-notes-frontend'
        BACKEND_IMAGE  = 'krishankumargupta/exam-notes-backend'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
                echo 'GitHub code checkout successful'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                    docker build \
                      -t "$FRONTEND_IMAGE:$BUILD_NUMBER" \
                      -t "$FRONTEND_IMAGE:latest" \
                      ./frontend/vite-project
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                sh '''
                    docker build \
                      -t "$BACKEND_IMAGE:$BUILD_NUMBER" \
                      -t "$BACKEND_IMAGE:latest" \
                      ./backend
                '''
            }
        }

        stage('Login and Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        set +x

                        echo "$DOCKER_TOKEN" | docker login \
                          -u "$DOCKER_USER" \
                          --password-stdin

                        docker push "$FRONTEND_IMAGE:$BUILD_NUMBER"
                        docker push "$FRONTEND_IMAGE:latest"

                        docker push "$BACKEND_IMAGE:$BUILD_NUMBER"
                        docker push "$BACKEND_IMAGE:latest"

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CI Pipeline completed successfully!'
        }

        failure {
            echo 'CI Pipeline failed. Check Console Output.'
        }

        always {
            echo 'Jenkins pipeline execution finished.'
        }
    }
}
