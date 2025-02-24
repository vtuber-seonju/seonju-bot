pipeline {
    agent any
    
    environment {
        REGISTRY_URL = 'ghcr.io'
        IMAGE_NAME = sh(script: 'echo $GIT_URL | sed -E "s/.*[:\\/]([^\\/]+\\/[^\\/]+)\\.git$/\\1/"', returnStdout: true).trim()
        IMAGE_TAG = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
        IMAGE_URL = "${REGISTRY_URL}/${IMAGE_NAME}:${IMAGE_TAG}"

        CONTAINER_NAME = sh(script: 'echo $GIT_URL | sed -E "s/.*[:\\/]([^\\/]+\\/[^\\/]+)\\.git$/\\1/" | tr "/" "-"', returnStdout: true).trim()
    }

    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'vtuber-seonju-seonju-bot', variable: 'DOPPLER_TOKEN')]) {
                        docker.build(env.IMAGE_URL, '--secret id=doppler,env=DOPPLER_TOKEN .')
                    }
                }
            }
        }
        
        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry('https://ghcr.io', 'ghcr') {
                        docker.image(env.IMAGE_URL).push()
                        docker.image(env.IMAGE_URL).push("latest")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "docker rm -f ${env.CONTAINER_NAME} || true"
                    sh """
                        docker create \
                            --name ${env.CONTAINER_NAME} \
                            --restart always \
                            ${env.IMAGE_URL}
                    """
                    sh "docker start ${env.CONTAINER_NAME}"
                }
            }
        }
    }
}