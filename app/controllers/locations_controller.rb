class LocationsController < ApplicationController
  def destroy
    location = Location.find_by(id: params[:id])
    if location
      location.destroy
      head :no_content
    else
      render json: { error: "Location not found" }, status: :not_found
    end
  end
end
