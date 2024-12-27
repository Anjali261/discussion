const awsConfig = {
    region: 'us-east-1',
    userPoolId: 'us-east-1_QABICtlRW',
    userPoolWebClientId: 'infobdikb5japt393d2h8kl8o',
    identityPoolId: 'us-east-1:8679e96d-c12c-4077-9450-e2d49b1c097b',
    oauth: {
        domain: 'discussionpanel.auth.us-east-1.amazoncognito.com',
        scope: ['openid', 'profile', 'email'],
        redirectSignIn: 'http://localhost:3000/',
        redirectSignOut: 'http://localhost:3000/',
        responseType: 'code',
    },
};

module.exports = awsConfig;
