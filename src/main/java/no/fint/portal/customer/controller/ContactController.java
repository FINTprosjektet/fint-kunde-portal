package no.fint.portal.customer.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import no.fint.portal.customer.service.PortalApiService;
import no.fint.portal.exceptions.CreateEntityMismatchException;
import no.fint.portal.exceptions.EntityFoundException;
import no.fint.portal.exceptions.EntityNotFoundException;
import no.fint.portal.exceptions.UpdateEntityMismatchException;
import no.fint.portal.model.ErrorResponse;
import no.fint.portal.model.contact.Contact;
import no.fint.portal.model.contact.ContactService;
import no.fint.portal.model.organisation.OrganisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ldap.NameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.UnknownHostException;
import java.util.List;

@RestController
@Api(tags = "Contacts")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/contacts")
public class ContactController {

  @Autowired
  PortalApiService portalApiService;

  @Autowired
  private ContactService contactService;

  @Autowired
  OrganisationService organisationService;

  @ApiOperation("Create new contact")
  @RequestMapping(method = RequestMethod.POST,
    consumes = MediaType.APPLICATION_JSON_UTF8_VALUE
  )
  public ResponseEntity createContact(@RequestBody final Contact contact) {
    if (!contactService.addContact(contact)) {
      throw new EntityFoundException(
        ServletUriComponentsBuilder
          .fromCurrentRequest().path("/{nin}")
          .buildAndExpand(contact.getNin()).toUri().toString()
      );
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(contact);
  }

  @ApiOperation("Update contact")
  @RequestMapping(method = RequestMethod.PUT,
    consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
    value = "/{nin}"
  )
  public ResponseEntity updateContact(@RequestBody final Contact contact, @PathVariable final String nin) {
    if (!nin.equals(contact.getNin())) {
      throw new UpdateEntityMismatchException("The contact to updateEntry is not the contact in endpoint.");
    }
    Contact original = portalApiService.getContact(nin);
    if (contact.getFirstName()!=null)
      original.setFirstName(contact.getFirstName());
    if (contact.getLastName()!=null)
      original.setLastName(contact.getLastName());
    if (contact.getMail()!=null)
      original.setMail(contact.getMail());
    if (contact.getMobile()!=null)
      original.setMobile(contact.getMobile());

    if (!contactService.updateContact(original)) {
      throw new EntityNotFoundException(String.format("Could not find contact: %s", nin));
    }

    return ResponseEntity.ok(original);
  }

  @ApiOperation("Get all contacts")
  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity getContacts() {
    List<Contact> contacts = contactService.getContacts();

    if (contacts != null) {
      return ResponseEntity.ok(contacts);
    }

    throw new EntityNotFoundException("No contacts found.");
  }

  @ApiOperation("Get contact by nin")
  @RequestMapping(method = RequestMethod.GET, value = "/{nin}")
  public ResponseEntity getContact(@PathVariable final String nin) {
    Contact contact = portalApiService.getContact(nin);
    return ResponseEntity.ok(contact);
  }

  @ApiOperation("Delete a contact")
  @RequestMapping(method = RequestMethod.DELETE, value = "/{nin}")
  public ResponseEntity deleteContacts(@PathVariable final String nin) {
    Contact contact = portalApiService.getContact(nin);

    contactService.deleteContact(contact);
    return ResponseEntity.noContent().build();
  }

  @ApiOperation("Get contact organisations")
  @GetMapping(value = "/organisations")
  public ResponseEntity getContactOrganisations() {
    organisationService.getOrganisations();
    return ResponseEntity.ok(organisationService.getOrganisations());
  }

  //
  // Exception handlers
  //
  @ExceptionHandler(UpdateEntityMismatchException.class)
  public ResponseEntity handleUpdateEntityMismatch(Exception e) {
    return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
  }

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity handleEntityNotFound(Exception e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
  }

  @ExceptionHandler(CreateEntityMismatchException.class)
  public ResponseEntity handleCreateEntityMismatch(Exception e) {
    return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
  }

  @ExceptionHandler(EntityFoundException.class)
  public ResponseEntity handleEntityFound(Exception e) {
    return ResponseEntity.status(HttpStatus.FOUND).body(new ErrorResponse(e.getMessage()));
  }

  @ExceptionHandler(NameNotFoundException.class)
  public ResponseEntity handleNameNotFound(Exception e) {
    return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
  }

  @ExceptionHandler(UnknownHostException.class)
  public ResponseEntity handleUnkownHost(Exception e) {
    return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new ErrorResponse(e.getMessage()));
  }

}