import React from 'react'
import '../styles/index.css'
import App from 'next/app'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import makeStore from '../store/store'

class MyApp extends App {
  static async getServerSideProps ({ Component, ctx }) {
    const pageProps = Component.getServerSideProps ? await Component.getServerSideProps(ctx) : {}
    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    )
  }
}

export default withRedux(makeStore)(MyApp)
