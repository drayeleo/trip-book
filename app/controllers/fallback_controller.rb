class FallbackController < ActionController::Base # ApplicationController
  def index
    render file: "public/index.html"
  end
end
