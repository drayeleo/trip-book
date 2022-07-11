class TripsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :handle_record_invalid

  def index
    user = User.find_by(id: session[:user_id])
    render json: user.trips
  end

  def create
    user = User.find_by(id: session[:user_id])
    trip = user.trips.create!(permitted_params)
    render json: trip, status: :created
  end

  def show
    trip = Trip.find_by(id: params[:id])
    render json: trip
  end

  # def add_images
  #   trip = Trip.find_by(id: params[:id])
  #   trip.images.attach(params[:images])
  #   render json: trip, status: :accepted
  # end

  def add_locations
    trip = Trip.find_by(id: params[:trip_id])

    # puts "in add_locations"

    for key in params.keys
      # puts "in for loop"
      if key.include? "file"
        i = key.split[0]
        lat = params[:"#{i} lat"]
        long = params[:"#{i} long"]

        location =
          Location.create!(
            latitude: lat.to_f,
            longitude: long.to_f,
            trip: Trip.find_by(id: params[:trip_id])
          )
        location.image.attach(params[:"#{i} file"])
        # puts location
        # debugger
      end
    end

    render json: trip.locations, status: :accepted

    # debugger
  end

  private

  def permitted_params
    params.permit(:trip_name, :trip_summary)
  end

  private

  def handle_record_invalid(exception)
    render json: {
             errors: exception.record.errors.full_messages
           },
           status: :unprocessable_entity
  end
end
