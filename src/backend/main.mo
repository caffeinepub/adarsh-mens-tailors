import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Map "mo:core/Map";
import CoreOrder "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

(actor {
  public type UserRole = AccessControl.UserRole;

  public type Address = {
    street : Text;
    city : Text;
    state : Text;
    zipCode : Text;
  };

  public type Customer = {
    id : Nat;
    name : Text;
    address : Address;
    phoneNumber : Text;
  };

  public type Measurements = {
    chest : Float;
    waist : Float;
    hips : Float;
    inseam : Float;
  };

  public type Order = {
    id : Nat;
    customer : Customer;
    measurements : Measurements;
    fabricType : Text;
    status : Text;
    estimatedCompletionDate : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  var nextCustomerId = 1;
  var nextOrderId = 1;

  let customers = Map.empty<Nat, Customer>();
  let orders = Map.empty<Nat, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func addCustomer(name : Text, address : Address, phoneNumber : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    let customer = {
      id = nextCustomerId;
      name;
      address;
      phoneNumber;
    };
    customers.add(nextCustomerId, customer);
    nextCustomerId += 1;
    customer.id;
  };

  public shared ({ caller }) func createOrder(customerId : Nat, measurements : Measurements, fabricType : Text, status : Text, estimatedCompletionDate : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    let customer = switch (customers.get(customerId)) {
      case (null) { Runtime.trap("Customer not found") };
      case (?customer) { customer };
    };

    let order = {
      id = nextOrderId;
      customer;
      measurements;
      fabricType;
      status;
      estimatedCompletionDate;
    };
    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async Order {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  module Order {
    public func compare(order1 : Order, order2 : Order) : CoreOrder.Order {
      Nat.compare(order1.id, order2.id);
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    orders.values().toArray().sort();
  };

  public shared ({ caller }) func updateOrder(orderId : Nat, measurements : Measurements, fabricType : Text, status : Text, estimatedCompletionDate : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    let order = switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };

    let updatedOrder = {
      order with
      measurements;
      fabricType;
      status;
      estimatedCompletionDate;
    };
    orders.add(orderId, updatedOrder);
  };

  public shared ({ caller }) func deleteOrder(orderId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    orders.remove(orderId);
  };

  public shared ({ caller }) func deleteCustomer(customerId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    customers.remove(customerId);
  };

  public query ({ caller }) func getCustomer(customerId : Nat) : async Customer {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    switch (customers.get(customerId)) {
      case (null) { Runtime.trap("Customer not found") };
      case (?customer) { customer };
    };
  };

  module Customer {
    public func compare(customer1 : Customer, customer2 : Customer) : CoreOrder.Order {
      Nat.compare(customer1.id, customer2.id);
    };
  };

  public query ({ caller }) func getAllCustomers() : async [Customer] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    customers.values().toArray().sort();
  };
});
