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