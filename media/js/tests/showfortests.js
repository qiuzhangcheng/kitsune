$(document).ready(function(){

var showforFixture = {
    setup: function() {
        var $sandbox = tests.createSandbox('#showfor'),
            options = {
                osSelector: 'select.os',
                browserSelector: 'select.browser'
            },
            $b = $sandbox.find(options.browserSelector),
            $o = $sandbox.find(options.osSelector);
        ShowFor.initForTags(options, $sandbox);
        this.$sandbox = $sandbox;
        this.$b = $b;
        this.$o = $o;
    },
    teardown: function() {
        this.$sandbox.remove();
    }
};

module('showfor', showforFixture);

function assertNotVisible($sandbox, forVals) {
    for (var i=0,l=forVals.length; i<l; i++) {
        equals($sandbox.find('[data-for="not ' + forVals[i] + '"]:visible').length, 0,
               '[data-for=' + forVals[i] + '] is not visible');
    }
}
function assertNotHidden($sandbox, forVals) {
    for (var i=0,l=forVals.length; i<l; i++) {
        equals($sandbox.find('[data-for="' + forVals[i] + '"]:hidden').length, 0,
               '[data-for=' + forVals[i] + '] is not hidden');
    }
}

test('default', function() {
    // Make sure initial setup is good (for example, on mac: data-for="mac"
    // shows and data-for="not mac" doesn't show)
    assertNotHidden(this.$sandbox, [this.$b.val(), this.$o.val()]);
    assertNotVisible(this.$sandbox, ['not ' + this.$b.val(), 'not ' + this.$o.val()]);
});

test('windows fx4', function() {
    $('#_input_win').click();
    $('#_input_fx4').click();
    equals(this.$o.val(), 'win', 'Windows is now selected');
    equals(this.$b.val(), 'fx4', 'Firefox 4 is now selected');
    assertNotHidden(this.$sandbox, ['win', 'not mac', 'android', 'fx35,fx4', 'm4']);
    assertNotVisible(this.$sandbox, ['mac,linux', 'maemo', 'fx3']);
});

test('linux fx35', function() {
    $('#_input_linux').click();
    $('#_input_fx35').click();
    equals(this.$o.val(), 'linux', 'Linux is now selected');
    equals(this.$b.val(), 'fx35', 'Firefox 3.5/6 is now selected');
    assertNotHidden(this.$sandbox, ['not mac', 'mac,linux', 'android', 'fx35,fx4', 'm4']);
    assertNotVisible(this.$sandbox, ['win', 'maemo', 'fx3']);
});

test('android m4', function() {
    $('#_input_android').click();
    $('#_input_m4').click();
    equals(this.$o.val(), 'android', 'Android is now selected');
    equals(this.$b.val(), 'm4', 'Firefox 4 is now selected');
    assertNotHidden(this.$sandbox, ['win', 'not mac', 'android', 'fx35,fx4', 'm4']);
    assertNotVisible(this.$sandbox, ['mac,linux', 'maemo', 'fx3']);
});


test('maemo m4', function() {
    $('#_input_maemo').click();
    $('#_input_m4').click();
    equals(this.$o.val(), 'maemo', 'Maemo is now selected');
    equals(this.$b.val(), 'm4', 'Firefox 4 is now selected');
    assertNotHidden(this.$sandbox, ['win', 'not mac', 'maemo', 'fx35,fx4', 'm4']);
    assertNotVisible(this.$sandbox, ['mac,linux', 'android', 'fx3']);
});

});
