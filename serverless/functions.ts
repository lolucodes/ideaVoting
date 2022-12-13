import { AWS } from '@serverless/typescript';



interface Authorizer {
  name: string;
  type: string;
  arn: {
    'Fn::GetAtt': string[];
  };
}



const authorizer: Authorizer = {
  name: 'authorizer',
  type: 'COGNITO_USER_POOLS',
  arn: { 'Fn::GetAtt': ['CognitoUserPool', 'Arn'] },
};


const functions: AWS['functions'] = {
  createBoard: {
    handler: 'src/functions/createBoard/index.handler',
    events: [
      {
        http: {
          method: 'post',
          path: '/boards',
          authorizer,
        },
      },
    ],
  },
  
  listBoard: {
    handler: 'src/functions/listBoard/index.handler',
    events: [
      {
        http: {
          method: 'get',
          path: '/boards',
        },
      },
    ],
  },
  
  getBoard: {
    handler: 'src/functions/getBoard/index.handler',
    events: [
      {
        http: {
          method: 'get',
          path: '/boards/{boardId}',
    
        },
      },
    ],
  },
  
  createIdea: {
    handler: 'src/functions/createIdea/index.handler',
    events: [
      {
        http: {
          method: 'post',
          path: '/ideas',
          authorizer,
        },
      },
    ],
  },
  
  voteOnIdea: {
    handler: 'src/functions/voteOnIdea/index.handler',
    events: [
      {
        http: {
          method: 'post',
          path: '/ideas/{ideaId}',
          authorizer,
        },
      },
    ],
  },

};

export default functions;
