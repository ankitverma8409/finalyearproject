document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('predictionForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get values
    const Age = parseInt(document.getElementById('Age').value);
    const Gender = document.getElementById('Gender').value;
    const Weight = parseFloat(document.getElementById('Weight').value);
    const Height = parseFloat(document.getElementById('Height').value);
    const Glucose = parseFloat(document.getElementById('Glucose').value);
    const Insulin = parseFloat(document.getElementById('Insulin').value);
    const TricepsThickness = parseFloat(document.getElementById('TricepsThickness').value);
    const BloodPressure = parseFloat(document.getElementById('BloodPressure').value);
    const Pregnancies = parseInt(document.getElementById('Pregnancies').value);
    const BMI = parseFloat(document.getElementById('BMI').value);
    const FamilyHistory = parseInt(document.getElementById('FamilyHistory').value);

    // Input validation
    if (Age <= 0 || Age > 120) return alert("Enter a valid Age (1-120)");
    if (Weight <= 20 || Weight > 250) return alert("Enter realistic Weight (20–250 kg)");
    if (Height <= 30 || Height > 250) return alert("Enter realistic Height (50–250 cm)");
    if (Glucose < 50 || Glucose > 250) return alert("Glucose should be between 50–250");
    if (BloodPressure < 40 || BloodPressure > 200) return alert("Enter valid Blood Pressure (40–200)");
    if (TricepsThickness < 5 || TricepsThickness > 60) return alert("Triceps thickness should be between 5–60 mm");
    if (Insulin < 0 || Insulin > 300) return alert("Insulin should be between 0–300");
    if (Pregnancies < 0 || Pregnancies > 20) return alert("Pregnancies should be between 0–20");
    if (!Gender) return alert("Please select Gender");

    let score = 0;

    // Glucose scoring
    if (Glucose >= 200) score += 5;
    else if (Glucose >= 150) score += 4;
    else if (Glucose >= 120) score += 3;
    else if (Glucose >= 100) score += 2;

    // BMI scoring
    if (BMI >= 40) score += 4;
    else if (BMI >= 35) score += 3;
    else if (BMI >= 30) score += 2;
    else if (BMI >= 25) score += 1;

    // Blood Pressure scoring
    if (BloodPressure >= 140) score += 3;
    else if (BloodPressure >= 130) score += 2;
    else if (BloodPressure >= 120) score += 1;

    // Age scoring
    if (Age >= 60) score += 3;
    else if (Age >= 45) score += 2;
    else if (Age >= 30) score += 1;

    // Family history
    if (FamilyHistory === 1) score += 2;

    // Pregnancy factor
    if (Gender === 'Female') {
      if (Pregnancies >= 5) score += 3;
      else if (Pregnancies >= 2) score += 2;
    }

    // Insulin score
    if (Insulin < 15 || Insulin > 200) score += 2;

    // Triceps Thickness
    if (TricepsThickness < 10 || TricepsThickness > 40) score += 2;

    // Weight-height disproportion (extreme obesity flag)
    const heightM = Height / 100;
    const expectedWeight = 22 * (heightM * heightM); // Ideal BMI weight
    const obesityFactor = Weight / expectedWeight;
    if (obesityFactor > 1.5) score += 2;

    // Final result
    let prediction = "Not Diabetic";
    if (score >= 15) prediction = "Critical Risk of Diabetes";
    else if (score >= 11) prediction = "High Risk";
    else if (score >= 7) prediction = "Moderate Risk";
    else if (score >= 4) prediction = "Borderline Risk";

    // Final binary classification
let binaryDiagnosis = (score >= 11) ? "Diabetic" : "Not Diabetic";
localStorage.setItem("binaryDiagnosis", binaryDiagnosis);


    // Save results
    localStorage.setItem("diabetesPrediction", prediction);
    localStorage.setItem("riskScore", score);
    localStorage.setItem("bmiValue", BMI.toFixed(2));

    // Go to result page
    window.location.href = "result.html";
  });
});
