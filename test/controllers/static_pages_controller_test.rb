require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase

  def setup
  	@base_title = "EnergyStorageStats"
  end

  test "should get home" do
    get :home
    assert_response :success
    assert_select "title", "#{@base_title}"
  end

  test "should get about" do
    get :about
    assert_response :success
    assert_select "title", "About | #{@base_title}"
  end

  test "should get help" do
    get :help
    assert_response :success
    assert_select "title", "Help | #{@base_title}"
  end

  test "should get examples" do
    get :examples
    assert_response :success
    assert_select "title", "examples | #{@base_title}"
  end

  test "should get submit" do
    get :submit
    assert_response :success
    assert_select "title", "Submit | #{@base_title}"
  end

end
