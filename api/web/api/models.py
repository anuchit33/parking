from django.db import models

STATUS = (
    (1,'Check In'),
    (2,'Check Out')
)
# Create your models here.
class CarList(models.Model):
    
    
    rfid = models.IntegerField()
    number = models.CharField(max_length=4)
    check_in_date = models.DateTimeField(auto_now_add=True)
    check_out_date = models.DateTimeField(blank=True, null=True)
    status = models.IntegerField(choices=STATUS, default=1)

    def __str__(self):
        return "%s:%s %s" % (self.rfid,self.number,self.get_status_display())
