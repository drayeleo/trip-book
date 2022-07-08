class UsersController < ApplicationController
  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
    
  end

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: {
               errors: user.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  # def add_images
  #   puts "made contact with users_controller"
  #   user = User.find_by(id: session[:user_id])
  #   user.images.attach(params[:images])
  #  # params[:images].each do |i|
  #   #  user.locations.create(image: i)

  #   # @user.images.attach(params[:images])
    
  # end

  private

  def user_params
    params.permit(
      :username,
      :password,
      :password_confirmation,
      :first_name,
      :last_name,
      # images: []
    )
  end
end
