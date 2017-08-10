describe('alert', function () {
  var $rootScope,
      $compile,
      container;

  beforeEach(module('app'));
  beforeEach(module('app.global'));
  beforeEach(module('templates'));

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;

    // Add id to elements to confirm that a specific element is removed
    container = angular.element(
      '<div>' +
      '<wmc-alert id="' + getIdPrefix() + '{{$index}}" ng-repeat="alert in alerts" type="{{alert.type}}"' +
      'close="removeAlert($index)">{{alert.msg}}' +
      '</wmc-alert>' +
      '</div>');

    $rootScope.alerts = [
      { msg:'foo', type:'success'},
      { msg:'bar', type:'error'},
      { msg:'baz'}
    ];
  }));

  function createAlerts() {
    $compile(container)($rootScope);
    $rootScope.$digest();
    return container.find('.alert');
  }

  function getIdPrefix() {
    return 'alert-';
  }

  function getId(index) {
    return getIdPrefix() + index;
  }

  function findCloseButton(index) {
    return container.find('.close').eq(index);
  }

  function findContent(index) {
    return container.find('[ng-transclude] span').eq(index);
  }

  it('should generate alerts using ng-repeat', function () {
    var alerts = createAlerts();
    expect(alerts.length).toEqual(3);
  });

  it('should use correct classes for different alert types', function () {
    var alerts = createAlerts();
    expect(alerts.eq(0)).toHaveClass('alert-success');
    expect(alerts.eq(1)).toHaveClass('alert-error');
    expect(alerts.eq(2)).toHaveClass('alert-warning');
  });

  it('should be possible to add additional classes for alert', function () {
    var element = $compile('<wmc-alert class="alert-block" type="info">Default alert!</wmc-alert>')($rootScope);
    $rootScope.$digest();
    expect(element).toHaveClass('alert-block');
    expect(element).toHaveClass('alert-info');
  });

  it('should respect alert type binding', function () {
    var alerts = createAlerts();
    expect(alerts.eq(0)).toHaveClass('alert-success');

    $rootScope.alerts[0].type = 'error';
    $rootScope.$digest();

    expect(alerts.eq(0)).toHaveClass('alert-error');
  });

  xit('should show the alert content', function() {
    var alerts = createAlerts();

    for (var i = 0, n = alerts.length; i < n; i++) {
      expect(findContent(i).text()).toBe($rootScope.alerts[i].msg);
    }
  });

  it('should show close button', function () {
    var alerts = createAlerts();

    for (var i = 0, n = alerts.length; i < n; i++) {
      expect(findCloseButton(i).css('display')).not.toBe('none');
    }
  });

  it('should have a close function', function () {
    var alerts = createAlerts();
    var index = 1;
    var element = alerts.eq(index);
    var scope = element.isolateScope();
    expect(scope.close).toBeDefined();
  });

  it('should execute the close callback after the close button is clicked', function () {
    var alerts = createAlerts();
    var index = 1;
    var element = alerts.eq(index);
    var scope = element.isolateScope();

    spyOn(scope, 'close');

    var button = findCloseButton(index);
    button.click();
    expect(scope.close).toHaveBeenCalled();
  });

});