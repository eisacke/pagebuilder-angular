angular
    .module('PageBuilder')
    .controller('PagesController', PagesController)

PagesController.$inject = ['Page', 'Module', '$state', '$stateParams']
function PagesController (Page, Module, $state, $stateParams) {

    // EVENT VARS
    var self = this;
    self.page = {};
    self.module = {};
    self.newPage = {};
    self.newModule = {};
  
    // EVENT FUNCTIONS
  
    // INDEX
    self.all = Page.query();

    self.getPage = function() { console.log('getPage');
        Page.get({ id: $stateParams.id}, function(page){
            self.page = page;
        });
    }
  
    if ($stateParams.id) {
        self.getPage();
    }
  
    // CREATE
    self.createPage = function() { console.log('createPage');
        Page.save(self.newPage, function(page) {
            self.showPage(page);
        });
    }
  
    // SHOW
    self.showPage = function(page) { console.log('showPage');
        $state.go('showPage', { id: page._id });
    }

    // MODULE FUNCTIONS
    self.handleDrop = function(event, ui) { console.log('handleDrop');
        if (ui.item.hasClass('components__single--new')) {
            ui.item.removeClass('components__single--new');
            
            self.newModule.page_id = $stateParams.id;
            var type = ui.item.data('type');
            self.newModule.type = type;
            showForm(type);

            Module.save(self.newModule, function(newModule){
                ui.item.attr('id', newModule._id);
                self.module._id = newModule._id;
                self.newModule = {};
                updateOrder();
            });

        } else {
            updateOrder();
        }
    }

    self.populateForm = function(module) { console.log('populateForm');
        var type = module.type;
        self.module = module;
        showForm(type);
    }

    self.updateModule = function() { console.log('updateModule');
        Module.update(self.module);
        self.getPage();
        hideForm();
        $("#sortable").find('.components__single').remove();
        self.module = {};
    }

    self.deleteModule = function(module) { console.log('deleteModule');
        Module.delete({id: module._id});
        var index = self.page.modules.indexOf(module);
        self.page.modules.splice(index, 1);
    }

    self.preview = function() {
        self.getPage();
        $(".preview").toggle();
    }

    function showForm(type) { console.log('showForm');
        $('.form--'+type).fadeIn();
    }

    function hideForm() { console.log('hideForm');
        $('.form').fadeOut();
    }

    function handleDrop(event, ui) { console.log('handleDrop');
        if (ui.item.hasClass('components__single--new')) {
            ui.item.removeClass('components__single--new');
            var type = ui.item.data('type');
            self.newModule.type = type;
            showForm(type)
        }
    }

    function updateOrder() { console.log('updateOrder');
        var data = $('#sortable').sortable("toArray");
        Module.saveOrder({data: data});
    }

    function initSortable() { console.log('initSortable');
        $('.components__single').draggable({
            revert: true,
            helper: 'clone',
            connectToSortable: '#sortable'
        });

        $( "#sortable" ).sortable({ 
            placeholder: "ui-sortable-placeholder",
            update: self.handleDrop,
            cursor: 'pointer',
            start: function(e, ui){
                ui.placeholder.height(ui.item.height());
            }
        });
    }

    function init() { console.log('init');
        initSortable();
    }

    init();
}