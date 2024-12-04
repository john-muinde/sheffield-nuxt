<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RequestQuoteMail extends Mailable
{
    use Queueable, SerializesModels;


    public $formData;

    /**
     * Create a new message instance.
     */
    public function __construct($formData)
    {

        $this->formData = $formData;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {

        $company_name = $this->formData['company_name'] ?? '';
        $the_subject = "Website Request for Quote by ".$company_name;

        return new Envelope(
            subject: $the_subject,
        );

    }

    /**
     * Get the message content definition.
     */
    public function build()
    {
        return $this->view('emails.request_quote');
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
