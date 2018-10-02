import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'
import UploadFileIPFS from '../../components/UploadFileIPFS'
class Home extends Component {
  render() {
    return (
      <section class="section">
        <div class="container">
          <h1 class="title">
            Hello World
          </h1>
          <p class="subtitle">
            My first website with <strong>Bulma</strong>!
          </p>
          
          <h3>IPFS Test</h3>
          <UploadFileIPFS {... this.props }/>
          <img src={logo} alt="drizzle-logo" />
          <h1>Drizzle Examples</h1>
          <p>Examples of how to get started with Drizzle in various situations.</p>

          <br/><br/>
        </div>

        <div class="container">
          <h2>Active Account</h2>
          <AccountData accountIndex="0" units="ether" precision="3" />

          <br/><br/>
        </div>

        <div class="container">
          <h2>SimpleStorage</h2>
          <p>This shows a simple ContractData component with no arguments, along with a form to set its value.</p>
          <p><strong>Stored Value</strong>: <ContractData contract="SimpleStorage" method="storedData" /></p>
          <ContractForm contract="SimpleStorage" method="set" />

          <br/><br/>
        </div>

        <div class="container">
          <h2>TutorialToken</h2>
          <p>Here we have a form with custom, friendly labels. Also note the token symbol will not display a loading indicator. We've suppressed it with the <code>hideIndicator</code> prop because we know this variable is constant.</p>
          <ContractForm contract="TutorialToken" method="transfer" labels={['To Address', 'Amount to Send']} />

          <br/><br/>
        </div>

        <div class="container">
          <h2>ComplexStorage</h2>
          <p>Finally this contract shows data types with additional considerations. Note in the code the strings below are converted from bytes to UTF-8 strings and the device data struct is iterated as a list.</p>
          <p><strong>String 1</strong>: <ContractData contract="ComplexStorage" method="string1" toUtf8 /></p>
          <p><strong>String 2</strong>: <ContractData contract="ComplexStorage" method="string2" toUtf8 /></p>
          <strong>Single Device Data</strong>: <ContractData contract="ComplexStorage" method="singleDD" />

          <br/><br/>
        </div>
        <div class="container">
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
        </div>
      </section>
    )
  }
}

export default Home
