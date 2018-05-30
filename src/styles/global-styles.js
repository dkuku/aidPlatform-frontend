import { injectGlobal } from 'styled-components'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

#root {
  height:100%;
}
#body {
  min-height:100%;
  margin-bottom: -150px;
}
#footer, #pusher {
  margin: 0;
  height: 150px;   /* Height of the footer */
}
.login-form {
height: 100%
}
`
