class TripsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :handle_record_invalid

  # def index
  #   user = User.find_by(id: session[:user_id])

  #   render json: user.trips
  # end
  def create
    user = User.find_by(id: session[:user_id])
    trip = user.trips.create!(permitted_params)
    render json: trip, status: :created
  end

  def show
    trip = Trip.find_by(id: params[:id])
    render json: trip
  end

  def add_images
    # puts "made contact with users_controller"
    # debugger
    trip = Trip.find_by(id: params[:id])
    # puts params[:id]
    trip.images.attach(params[:images])
    render json: trip, status: :accepted
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
