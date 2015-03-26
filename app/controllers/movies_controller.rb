class MoviesController < ApplicationController
   # before_action :set_movie, only: [:show, :edit, :update, :destroy]
  def index
      #@movie = Movie.all
      @movies = Movie.all.order('order_no ASC')
      @movie = Movie.new
   
  end

  def new
    @movie = Movie.new
  end

  def create
    @movie = Movie.new(movie_params)
    respond_to do |format|
      if @movie.save
        format.html { redirect_to @movie, notice: 'movie was successfully created.' }
        format.json { render action: 'show', status: :created, location: @movie }
        # added:
        format.js   { render action: 'show', status: :created, location: @movie }
      else
        format.html { render action: 'new' }
        format.json { render json: @movie.errors, status: :unprocessable_entity }
        # added:
        format.js   { render json: @movie.errors, status: :unprocessable_entity }
      end
    end
  end

  def sort
    # reading
    params[:changed_orders].values.each do |param|
      #update
      @movie = Movie.find(param[:id])
      @movie.order_no = param[:order_no]
      @movie.save!
    end
    render text: 'success'
  end
  def rate
  #binding.pry
  @movie = Movie.find(params[:movie_id])
  @movie.rating = params[:ratings]
  @movie.save!
end
def destroy
    @movie.destroy
    respond_to do |format|
      format.html { redirect_to movies_url, notice: 'Movie was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
 # def set_movie
 #      @movie = Movie.find(params[:id])
 #    end
private
def movie_params
  params.require(:movie).permit(:name, :realese, :actor, :director, :rating)
end

end


