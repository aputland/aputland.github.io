  let formOption = 'optionsMetric';

  let outputData = {
    height: 166,
    idealWeight: 63,
    lowVT: 400,
    highVT: 500,
  };

  const clear = () => {
    $('input[type=text]').val('');
  };

  const feetToCm = (feet, inches) => {
    console.log(feet);
    console.log(inches);
    //let height = 2.54*(feet*12 + inches);
    let height = 2.54 * ((feet * 12) + inches);
    console.log(height);
    return Math.round(height * 10) / 10;
  }

  const kgBMIToCm = (kg, BMI) => {
    let height = 100 * Math.sqrt(kg/BMI);
    return Math.round(height * 10) / 10;
  }

  const allCalcs = (height, gender) => {
    outputData.height = height;
    outputData.idealWeight = idealWt(height, gender);
    outputData.lowVT = 10 * Math.round(outputData.idealWeight * 0.6);
    outputData.highVT = 10 * Math.round(outputData.idealWeight * 0.8);
  }

  const idealWt = (height, gender) => {
    let ibm = 0;
    if (gender === 'm') {
      ibm = 50.0 + 0.91 * (height - 152.4);
    } else {
      ibm = 45.5 + 0.91 * (height - 152.4);
    }
    return Math.round(ibm * 10) / 10;
  }

  const kgCmToBMI = (kg, cm) => {
    let bmi = kg/(cm/100)^2;
    return Math.round(ibm * 10) / 10;
  }

  const displayResults = (results) => {
    console.log(results);
    $('#outputHeight').html(results.height);
    $('#outputWeight').html(results.idealWeight);
    $('#outputLowVT').html(results.lowVT);
    $('#outputHighVT').html(results.highVT);
  }

  $( document ).ready(()  => {
    $('#imperialHeight, #calcHeight').hide();
    $('#metricHeight').show();
    $('#mainContent').hide();
    $('#results').hide();
    clear();
  })

  $('#goContinue').click((e) => {
    e.preventDefault();
    $('#disclaimer').hide();
    $('#mainContent').show();
  })

  $('#goCancel').click((e) => {
    e.preventDefault();
    close();
    // close current tab
  })

  $('.inputOption').change((e) => {
    e.preventDefault();
    clear(); //clear all text boxes
    $('#results').hide();
    formOption = e.target.id;
    switch(formOption) {
      case 'optionsMetric':
        $('#imperialHeight, #calcHeight').hide();
        $('#metricHeight').show();
        break;
      case 'optionsImperial':
        $('#metricHeight, #calcHeight').hide();
        $('#imperialHeight').show();
        break;
      case 'optionsCalc':
        $('#metricHeight, #imperialHeight').hide();
        $('#calcHeight').show();
        break;
      };
  });

  $('#goCalculate').click((e) => {
    e.preventDefault();
    let height = 0;
    let valid = true;
    let errorMessage = '';
    let gender = $('input:radio[name="inputGender"]:checked').val();
    if (gender===undefined) {
      valid = false;
      errorMessage = 'Gender not selected';
    };
    switch(formOption) {
      case 'optionsMetric':
        height = parseFloat($('#inputCm').val());
        break;
      case 'optionsImperial':
        // some validation
        height = feetToCm(
          parseInt($('#inputFeet').val()),
          parseFloat($('#inputInches').val())
        );
        break;
      case 'optionsCalc':
        height = kgBMIToCm(
          parseFloat($('#inputWeight').val()),
          parseInt($('#inputBMI').val())
        );
        break;
    };
    if (height<153 || height>220) {
      valid= false;
      errorMessage = 'Height outside accepted range'
    };
    if (valid) {
      allCalcs(height, gender);
      displayResults(outputData);
      $('#results').show();
    } else {
      $('#results').hide();
      alert(errorMessage);
    };
  });
