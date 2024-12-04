<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CareerMail extends Mailable
{
    use Queueable, SerializesModels;

    public $formData;

    /**
     * Create a new message instance.
     */
    public function __construct($formData)
    {
        //
        $this->formData = $formData;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {

        $job_title = $this->formData['job_title'] ?? 'Default Subject';
        $the_subject = "Website Job Application"." - ".$job_title;

        return new Envelope(
            subject: $the_subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function build()
    {
        $message = $this->view('emails.career');

        // Attach CV file
        $message->attachData(
            $this->formData['cv']['contents'],
            $this->formData['cv']['name']
        );

        $message->attachData(
            $this->formData['supporting_document']['contents'],
            $this->formData['supporting_document']['name']
        );

        return $message;

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
