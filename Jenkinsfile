pipeline {
agent any

```
environment {
    DOCKER_COMPOSE_FILE = "docker-compose.yml"
    PROJECT_DIR = "${WORKSPACE}"   // Jenkins workspace
    BRANCH = "main"
}

stages {

    stage('Checkout') {
        steps {
            echo "Cloning repository..."
            git branch: "${BRANCH}", url: "git@github.com:Sanchar127/know_your_candidate.git"
        }
    }

    stage('Build Docker Images') {
        steps {
            echo "Building Docker Compose images..."
            sh """
            docker-compose -f ${DOCKER_COMPOSE_FILE} build
            """
        }
    }

    stage('Stop Existing Containers') {
        steps {
            echo "Stopping existing containers (if any)..."
            sh """
            docker-compose -f ${DOCKER_COMPOSE_FILE} down
            """
        }
    }

    stage('Start Containers') {
        steps {
            echo "Starting containers..."
            sh """
            docker-compose -f ${DOCKER_COMPOSE_FILE} up -d
            """
        }
    }

    stage('Health Check') {
        steps {
            echo "Waiting for services to be healthy..."
            // Example: check web service health
            sh """
            for i in {1..20}; do
              STATUS=\$(docker inspect --format='{{.State.Health.Status}}' nextjs_frontend)
              if [ "\$STATUS" = "healthy" ]; then
                echo "Frontend is healthy"
                break
              fi
              echo "Waiting for frontend to become healthy..."
              sleep 5
            done
            """
        }
    }
}

post {
    success {
        echo "Docker Compose deployment completed successfully!"
    }
    failure {
        echo "Deployment failed!"
    }
}
```

}
