require 'test_helper'

class HratesControllerTest < ActionController::TestCase
  setup do
    @hrate = hrates(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:hrates)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create hrate" do
    assert_difference('Hrate.count') do
      post :create, hrate: {  }
    end

    assert_redirected_to hrate_path(assigns(:hrate))
  end

  test "should show hrate" do
    get :show, id: @hrate
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @hrate
    assert_response :success
  end

  test "should update hrate" do
    patch :update, id: @hrate, hrate: {  }
    assert_redirected_to hrate_path(assigns(:hrate))
  end

  test "should destroy hrate" do
    assert_difference('Hrate.count', -1) do
      delete :destroy, id: @hrate
    end

    assert_redirected_to hrates_path
  end
end
