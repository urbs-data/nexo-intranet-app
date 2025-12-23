DEPLOY_REGION="us-central1"
DEPLOY_PROJECT_ID="nexo-dev-465520"
DEPLOY_ARTIFACT_REPO="nexo-artifacts"
DEPLOY_IMAGE_NAME_INTRA="nexo-intranet-app"
IMAGE_TAG_INTRA="$DEPLOY_REGION-docker.pkg.dev/$DEPLOY_PROJECT_ID/$DEPLOY_ARTIFACT_REPO/$DEPLOY_IMAGE_NAME_INTRA:latest"

gcloud config set project $DEPLOY_PROJECT_ID

gcloud auth configure-docker $DEPLOY_REGION-docker.pkg.dev

set -a
source .env.staging
set +a

docker build --platform linux/amd64 \
  $(grep -v '^#' .env.staging | grep -v '^$' | cut -d= -f1 | sed 's/^/--build-arg /') \
  -f Dockerfile -t $IMAGE_TAG_INTRA .

docker push $IMAGE_TAG_INTRA