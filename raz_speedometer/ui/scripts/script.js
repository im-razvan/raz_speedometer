const useKMPH = true;

$(document).ready(() => {
  window.addEventListener("message", (event) => {
    const { action, speed, rpm, fuel } = event.data;
    
    if (action === "show") {
      showDashboard(speed, rpm, fuel);
    } else if (action === "hide") {
      hideDashboard();
    }
  });
});

function showDashboard(speed, rpm, fuel) {
  $(".dashboard").removeClass("hidden");
  
  const displaySpeed = useKMPH ? speed * 3.6 : speed * 2.23693629;
  const speedUnit = useKMPH ? "km/h" : "mph";
  const rpmPercentage = rpm * 100;
  const fuelPercentage = fuel * 100;

  updateSpeedDisplay(displaySpeed, speedUnit);
  updateRPMBar(rpmPercentage);
  updateFuelGauge(fuelPercentage);
}

function updateSpeedDisplay(speed, unit) {
  $(".speed-value").text(speed.toFixed(0));
  $(".speed-unit").text(unit);
}

function updateRPMBar(percentage) {
  $(".rpm-fill").css("width", `${percentage}%`);
  
  if (percentage > 80) {
    $(".rpm-fill").css("background-color", "#FF5252");
  } else if (percentage >= 50) {
    $(".rpm-fill").css("background-color", "#FFC107");
  } else {
    $(".rpm-fill").css("background-color", "#4CAF50");
  }
}

function updateFuelGauge(percentage) {
  $(".fuel-level").css("height", `${percentage}%`);
  
  if (percentage <= 20) {
    $(".fuel-level").css("background-color", "#FF5252");
  } else if (percentage <= 50) {
    $(".fuel-level").css("background-color", "#FFC107");
  } else {
    $(".fuel-level").css("background-color", "#4CAF50");
  }
}

function hideDashboard() {
  $(".dashboard").addClass("hidden");
}

