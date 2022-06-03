def defineEnv() {
    branchName="${env.BRANCH_NAME}"
    if (branchName == "master") {
        return "pro"
    }
    else if (branchName == "pre") {
        return "pre"
    }
    else if (branchName == "develop") {
        return "dev"
    }
    else {
        return "none"
    }
}
def npmEnvFileName() {
    branchName="${env.BRANCH_NAME}"
    if (branchName == "master") {
        return "env.pro"
    }
    else if (branchName == "pre") {
        return "env.pre"
    }
    else if (branchName == "develop") {
        return "env.dev"
    }
    else {
        return "env.dev"
    }
}
pipeline {
    agent {
        dockerfile {
            filename "Dockerfile"
            args "--entrypoint="
        }
    }
    environment {
        STAGE = defineEnv()
        NPM_ENV_FILE_NAME = npmEnvFileName()
        NPM_ENV_FILE = credentials("${env.NPM_ENV_FILE_NAME}")
    }
    option {

    }
    stages {
        stage('Preparation...') {
            echo 'Preparation...'
        }
        stage('Build & Dependencies') {
            echo 'Build & Dependencies'
            sh """
                npm i
                npm run build
            """
        }
        stage('Test') {
            echo 'Testing...'
            sh script: 'npm run ci:e2e'
        }
        stage('Publish content') {
            when {
                anyOf {
                    branch "master"
                    branch "pre"
                    branch "develop"
                }
            }
            steps {
                // Environment to deploy
                sh """
                """
            }
        }
    }
    post {
        
    }
}