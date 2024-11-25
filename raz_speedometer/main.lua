RegisterNetEvent("raz_speedometer:show")
AddEventHandler("raz_speedometer:show", function(velocity, engineRpm, fuelLevel)
    SendNUIMessage({
        action = "show",
        speed = velocity,
        rpm = engineRpm,
        fuel = fuelLevel
    })
end)

RegisterNetEvent("raz_speedometer:hide")
AddEventHandler("raz_speedometer:hide", function()
    SendNUIMessage({
        action = "hide"
    })
end)

Citizen.CreateThread(function()
    while true do
        local playerVehicle = GetVehiclePedIsIn(GetPlayerPed(-1), false)
        if playerVehicle ~= 0 and GetIsVehicleEngineRunning(playerVehicle) then
            TriggerEvent("raz_speedometer:show", GetEntitySpeed(playerVehicle), GetVehicleCurrentRpm(playerVehicle), GetVehicleFuelLevel(playerVehicle) * 0.01)
        else
            TriggerEvent("raz_speedometer:hide")
        end

        for _, hudComponent in ipairs({7, 9}) do
            HideHudComponentThisFrame(hudComponent)
        end

        Citizen.Wait(1)
    end
end)
