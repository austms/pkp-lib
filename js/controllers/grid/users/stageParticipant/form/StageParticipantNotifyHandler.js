/**
 * @defgroup js_controllers_grid_users_stageParticipant_form
 */
/**
 * @file js/controllers/grid/users/stageParticipant/form/StageParticipantNotifyHandler.js
 *
 * Copyright (c) 2014 Simon Fraser University Library
 * Copyright (c) 2000-2014 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * @class StageParticipantNotifyHandler
 * @ingroup js_controllers_grid_users_stageParticipant_form
 *
 * @brief Handle Stage participant notification forms.
 */
(function($) {

	/** @type {Object} */
	$.pkp.controllers.grid.users.stageParticipant =
			$.pkp.controllers.grid.users.stageParticipant ||
			{ form: { } };



	/**
	 * @constructor
	 *
	 * @extends $.pkp.controllers.form.AjaxFormHandler
	 *
	 * @param {jQueryObject} $form the wrapped HTML form element.
	 * @param {Object} options form options.
	 */
	$.pkp.controllers.grid.users.stageParticipant.form.
			StageParticipantNotifyHandler = function($form, options) {

		this.parent($form, options);

		// Set the URL to retrieve templates from.
		if (options.templateUrl) {
			this.templateUrl_ = options.templateUrl;
		}

		// Attach form elements events.
		$form.find('#template').change(
				this.callbackWrapper(this.selectTemplateHandler_));
	};
	$.pkp.classes.Helper.inherits(
			$.pkp.controllers.grid.users.stageParticipant.form.
					StageParticipantNotifyHandler,
			$.pkp.controllers.form.AjaxFormHandler);


	//
	// Private properties
	//
	/**
	 * The URL to use to retrieve template bodies
	 * @private
	 * @type {string?}
	 */
	$.pkp.controllers.grid.users.stageParticipant.form.
			StageParticipantNotifyHandler.prototype.templateUrl_ = null;


	//
	// Private methods
	//
	/**
	 * Respond to an "item selected" call by triggering a published event.
	 *
	 * @param {HTMLElement} sourceElement The element that
	 *  issued the event.
	 * @param {Event} event The triggering event.
	 * @private
	 */
	$.pkp.controllers.grid.users.stageParticipant.form.
			StageParticipantNotifyHandler.prototype.selectTemplateHandler_ =
					function(sourceElement, event) {

		var $form = this.getHtmlElement();
		$.post(this.templateUrl_, $form.find('#template').serialize(),
				this.callbackWrapper(this.updateTemplate), 'json');
	};


	/**
	 * Internal callback to replace the textarea with the contents of the
	 * template body.
	 *
	 * @param {HTMLElement} formElement The wrapped HTML form.
	 * @param {Object} jsonData The data returned from the server.
	 * @return {boolean} The response status.
	 */
	$.pkp.controllers.grid.users.stageParticipant.form.
			StageParticipantNotifyHandler.prototype.updateTemplate =
					function(formElement, jsonData) {

		var $form = this.getHtmlElement(),
				processedJsonData = this.handleJson(jsonData);

		if (processedJsonData !== false) {
			if (processedJsonData.content !== '') {
				$form.find('textarea[name="message"]').val(processedJsonData.content);
			}
		}
		return processedJsonData.status;
	};

/** @param {jQuery} $ jQuery closure. */
}(jQuery));
