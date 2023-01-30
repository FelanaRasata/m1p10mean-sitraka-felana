export const index = () => {

    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Sata’s Car Clinic</title>
      <style>
        *{
          margin: 0;
          padding: 0;
        }
        body {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #191919;
        }
        .container {
          height: 145px;
          width: 220px;
        }
        .eye-box-1 {
          width: 110px;
          height: 114px;
          background: #E08027;
          border-radius: 0 50% 50%;
          position: relative;
        }
        .eye-1 {
          height: 90px;
          width: 90px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #191919;
          border-radius: 50%;
        }
        .eyeball-1 {
          height: 15px;
          width: 30px;
          border: solid #E08027;
          border-width: 15px 0px 0 0;
          background: #191919;
          border-radius: 50%;
          position: absolute;
          top: 56%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .pupil-1 {
          height: 6px;
          width: 12px;
          border: solid #191919;
          border-width: 6px 0px 0 0;
          background: #191919;
          border-radius: 50%;
          position: absolute;
          left: 9px;
          top: -6px;
        }
        .nose {
          height: 50px;
          width: 50px;
          position: absolute;
          top: 85px;
          left: 85px;
          background: #E08027;
          transform: rotate(45deg);
          
        }
        .eye-box-2 {
          width: 110px;
          height: 114px;
          background: #E08027;
          border: 10px solid #191919;
          border-radius: 50% 0 50% 50%;
          position: relative;
          left: 97px;
          top: -10px;
        }
        .eye-2 {
          height: 90px;
          width: 90px;
          position: absolute;
          top: 50%;
          right: 50%;
          transform: translate(50%, -50%);
          background: #191919;
          border-radius: 50%;
        }
        .eyeball-2 {
          height: 15px;
          width: 30px;
          border: solid #E08027;
          border-width: 15px 0px 0 0;
          background: #191919;
          border-radius: 50%;
          position: absolute;
          top: 56%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .pupil-2 {
          height: 6px;
          width: 12px;
          border: solid #191919;
          border-width: 6px 0px 0 0;
          background: #191919;
          border-radius: 50%;
          position: absolute;
          left: 9px;
          top: -6px;
        }
      </style>
  </head>
  <body>
      <div class="container">
        <div class="eye-box-1">
          <div class="eye-1">
            <div class="eyeball-1">
            \t<div class="pupil-1">
            </div>
          </div>
        </div>
        <div class="nose"></div>
        <div class="eye-box-2">
          <div class="eye-2">
            <div class="eyeball-2">
            \t<div class="pupil-2">
            </div>
          </div>
        </div>
      </div>

  </body>
  </html>
  `
}

export const exit_voucher = (carNumber, user) => {

    return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Exit Voucher</title>
  <style>
    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }

    a {
      color: #5D6975;
      text-decoration: underline;
    }

    body {
      position: relative;
      width: 21cm;
      height: 29.7cm;
      margin: 0 auto;
      color: #001028;
      background: #FFFFFF;
      font-family: Arial, sans-serif;
      font-size: 12px;
      font-family: Arial;
    }

    header {
      padding: 10px 0;
      margin-bottom: 30px;
    }

    #logo {
      text-align: center;
      margin-bottom: 10px;
    }

    #logo img {
      width: 90px;
    }

    h1 {
      border-top: 1px solid #5D6975;
      border-bottom: 1px solid #5D6975;
      color: #5D6975;
      font-size: 2.4em;
      line-height: 1.4em;
      font-weight: normal;
      text-align: center;
      margin: 0 0 20px 0;
    }

    #project {
      float: left;
    }

    #project span {
      color: #5D6975;
      text-align: right;
      width: 52px;
      margin-right: 10px;
      display: inline-block;
      font-size: 0.8em;
    }

    #company {
      float: right;
      text-align: right;
    }

    #project div,
    #company div {
      white-space: nowrap;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 20px;
    }

    table tr:nth-child(2n-1) td {
      background: #F5F5F5;
    }

    table th,
    table td {
      text-align: center;
    }

    table th {
      padding: 5px 20px;
      color: #5D6975;
      border-bottom: 1px solid #C1CED9;
      white-space: nowrap;
      font-weight: normal;
    }

    table .service,
    table .desc {
      text-align: left;
    }

    table td {
      padding: 20px;
      text-align: right;
    }

    table td.service,
    table td.desc {
      vertical-align: top;
    }

    table td.unit,
    table td.qty,
    table td.total {
      font-size: 1.2em;
    }

    table td.grand {
      border-top: 1px solid #5D6975;
      ;
    }

    #notices .notice {
      color: #5D6975;
      font-size: 1.2em;
    }

    footer {
      color: #5D6975;
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #C1CED9;
      padding: 8px 0;
      text-align: center;
    }
  </style>
</head>

<body>
  <header class="clearfix">
    <h1>EXIT VOUCHER</h1>
    <div id="project">
      <div><span>CLIENT</span> ${user.lastName}</div>
      <div><span>EMAIL</span> ${user.emailAddress}</a></div>
    </div>
  </header>
  <main>
    <table>
      <thead>
        <tr>
          <th class="service">CAR NUMBER</th>
          <th>QTY</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="service">${carNumber}</td>
          <td class="qty">1</td>
        </tr>
        
        <tr>
          <td >Workshop</td>
          <td >Customer</td>
        </tr>
        
      </tbody>
    </table>
  
  </main>
</body>

</html>
  `
}

export const invoice = (repair) => {

    const user = repair.customer

    return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Example 1</title>
  <style>
    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }

    a {
      color: #5D6975;
      text-decoration: underline;
    }

    body {
      position: relative;
      width: 21cm;
      height: 29.7cm;
      margin: 0 auto;
      color: #001028;
      background: #FFFFFF;
      font-family: Arial, sans-serif;
      font-size: 12px;
      font-family: Arial;
    }

    header {
      padding: 10px 0;
      margin-bottom: 30px;
    }

    #logo {
      text-align: center;
      margin-bottom: 10px;
    }

    #logo img {
      width: 90px;
    }

    h1 {
      border-top: 1px solid #5D6975;
      border-bottom: 1px solid #5D6975;
      color: #5D6975;
      font-size: 2.4em;
      line-height: 1.4em;
      font-weight: normal;
      text-align: center;
      margin: 0 0 20px 0;
    }

    #project {
      float: left;
    }

    #project span {
      color: #5D6975;
      text-align: right;
      width: 52px;
      margin-right: 10px;
      display: inline-block;
      font-size: 0.8em;
    }

    #company {
      float: right;
      text-align: right;
    }

    #project div,
    #company div {
      white-space: nowrap;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 20px;
    }

    table tr:nth-child(2n-1) td {
      background: #F5F5F5;
    }

    table th,
    table td {
      text-align: center;
    }

    table th {
      padding: 5px 20px;
      color: #5D6975;
      border-bottom: 1px solid #C1CED9;
      white-space: nowrap;
      font-weight: normal;
    }

    table .service,
    table .desc {
      text-align: left;
    }

    table td {
      padding: 20px;
      text-align: right;
    }

    table td.service,
    table td.desc {
      vertical-align: top;
    }

    table td.unit,
    table td.qty,
    table td.total {
      font-size: 1.2em;
    }

    table td.grand {
      border-top: 1px solid #5D6975;
      ;
    }

    #notices .notice {
      color: #5D6975;
      font-size: 1.2em;
    }

    footer {
      color: #5D6975;
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #C1CED9;
      padding: 8px 0;
      text-align: center;
    }
  </style>
</head>

<body>
  <header class="clearfix">
    <h1>FACTURE</h1>
    <div id="company" class="clearfix">
      <div>Sata Clinic's Car</div>
    </div>
    <div id="project">
      <div><span>PROJECT</span> Repair Car</div>
      <div><span>CLIENT</span> ${user.username}</div>
      <div><span>EMAIL</span> ${user.emailAddress}</a></div>
    </div>
  </header>
  <main>
    <table>
      <thead>
      
        <tr>
          <th class="service">REPAIR TYPE</th>
          <th>PRICE</th>
          <th>QTY</th>
          <th>TOTAL</th>
        </tr>
      </thead>
      <tbody>
      
        <tbody>
        ${repair.selectedRepairs.map(item => {
        return `
            <tr>
              <td class="service">${item.repairType.name}</td>
              <td class="unit">${item.repairType.repairCost}</td>
              <td class="qty">${item.quantity}</td>
              <td class="total">${item.repairType.repairCost * item.quantity}</td>
            </tr>
          `
    }).join('')}
        <tr>
          <td colspan="3">TOTAL</td>
          <td class="total">${repair.price}</td>
        </tr>
       
      </tbody>
    </table>
  </main>
</body>

</html>
  `
}
