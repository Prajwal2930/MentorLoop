@Library('Shared') _

pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'SonarScanner'
    }

    stages {

        stage('Workspace cleanup') {
            steps {
                script {
                    cleanWs()
                }
            }
        }

        stage('Git: Code Checkout') {
            steps {
                script {
                    clone("https://github.com/Prajwal2930/MentorLoop.git", "Devops")
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    dir('backend') {
                        sh 'npm install'
                    }

                    dir('frontend') {
                        sh 'npm install'
                    }
                }
            }
        }
        
        stage('OWASP-Dependency-Check') {
             steps {
                 script {
                    //OWASP_Dependency ()
                    echo "this is dependency check"
                 }
             }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        ${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=MentorLoop \
                        -Dsonar.projectName=MentorLoop \
                        -Dsonar.sources=backend,frontend \
                        -Dsonar.sourceEncoding=UTF-8
                    """
                }
            }
        }
        
         stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
       stage('Trivy File System Scan') {
          steps {
                sh '''
                       trivy fs \
                     --format table \
                     --severity HIGH,CRITICAL \
                     --output trivy-fs-report.txt \
            .        '''
                  }
            }
            
               stage('Build backend Docker Image') {
                steps {
                    dir('backend') {
                        sh 'docker build -t prajwal2930/mentorloop-backend:latest .'
                    }
                }
            }
            
            stage('Build Frontend Docker Image') {
                steps {
                    dir('frontend') {
                        sh 'docker build -t prajwal2930/mentorloop-frontend:latest .'
                    }
                }
            }
       
            stage('Trivy Backend Image Scan') {
                steps {
                    sh 'trivy image prajwal2930/mentorloop-backend:latest'
                }
            }

          stage('Trivy Frontend Image Scan') {
                steps {
                    sh 'trivy image prajwal2930/mentorloop-frontend:latest'
                }
            }
            
          stage('Docker Hub Login') {
                steps {
                    withCredentials([usernamePassword(
                        credentialsId: 'Dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) 
                    { sh '''   echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin  '''
                    }
                }
            }
             stage('Push Backend Image') {
                steps {
                    sh 'docker push prajwal2930/mentorloop-backend:latest'
                }
            }
             stage('Push frontend Image') {
                steps {
                    sh 'docker push prajwal2930/mentorloop-frontend:latest'
                }
            }            
                    

    }
} 