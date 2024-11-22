from django.db.models.signals import post_delete
from django.dispatch import receiver
from user.models import User
from wrap.models import Wrap


# Controls what happens to wraps when their created user is deleted
# (They also get deleted)
@receiver(post_delete, sender=User)
def delete_created_wraps(sender, instance, **kwargs):
    created_wraps = instance.created_wraps.all()
    for wrap in created_wraps:
        wrap.delete()