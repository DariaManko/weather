pipeline {
	agent { label 'jenkins_agent_python' }

    stages {
		stage('Docker Check') {
			steps {
				sh 'echo $DOCKER_HOST'
				sh 'docker version'
			}
		}
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        stage('Run Playwright Tests') {
			steps{
				script {
					docker.image('mcr.microsoft.com/playwright:v1.56.1-noble').inside('--entrypoint="" -u root:root -v npm_pw_cache:/root/.npm') {
						sh '''
							unset FORCE_COLOR
	          				export NO_COLOR=1
							npm ci
							npm run test:dev
						'''
					}
				}
			}
        }
    }
    post {
        success {
        	echo '✅ Tests passed successfully!'
			slackSend channel: '#playwright-runs',
                      message: "Build ${currentBuild.fullDisplayName} succeeded! ${currentBuild.URL}"
        }
        failure {
        	echo '❌ Some tests failed. Check the report for details.'
			slackSend channel: '#playwright-runs',
                      message: "Build ${currentBuild.fullDisplayName} failed! ${currentBuild.URL}"
        }
	}
}
