import React, { Component } from 'react'
import { AccountData} from 'drizzle-react-components'
import logo from '../../logo.png'
import UploadFileIPFS from '../../components/UploadFileIPFS'

import FileTable from '../../components/FileTable'
import LoginForm from '../../components/LoginForm'
class Home extends Component {
  render() {
    return (
      <section class="section">
        <div class="container">
          <h1 class="title">
            Getting started
          </h1>
          <p class="subtitle">
           File out Form and upload an image to decentralized <strong>IPFS</strong>!
          </p>
          <LoginForm {... this.props } />
          <hr />
          <UploadFileIPFS {... this.props } />
          

          <br/><br/>
        </div>

        <div class="container">
          <h2>Active Account</h2>
          <AccountData accountIndex="0" units="ether" precision="3" />

          <br/>
          
          <h4>Files Table</h4>
          <FileTable fileOwnerAddress = {this.props.accounts[0]} {... this.props} />
          <img src={logo} alt="drizzle-logo" />
          
          <h1>Dapp Built with drizzle</h1>
          <p>Examples of how to get started with Drizzle in various situations.</p>
        </div>
  
        {/**
        <div class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Tweets</p>
              <p class="title">3,456</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
             <div>
               <p class="heading">Following</p>
               <p class="title">123</p>
             </div>
          </div>
          <div class="level-item has-text-centered">
             <div>
               <p class="heading">Followers</p>
               <p class="title">456K</p>
             </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="heading">Likes</p>
              <p class="title">789</p>
            </div>
          </div>
        */}
      </section>
    )
  }
}

export default Home
