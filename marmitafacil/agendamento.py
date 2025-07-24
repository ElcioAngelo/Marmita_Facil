from django_cron import CronJobBase, Schedule
from django.utils import timezone 
from usuarios.models import AgendamentoPedido, Pedido

class ProcessarAgendamentosJob(CronJobBase):
    RUN_EVERY_MINS = 480
    
    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = 'marmitafacil.cron'
    
    def do(self):
        hoje = timezone.now().strftime('%a')[:3].lower()
        now = timezone.now()
        
        agendamentos = AgendamentoPedido.objects.filter(ativo=True, auto_pedido=True)
        
        for ag in agendamentos:
            dias = [d.strip()[:3].lower() for d in ag.dias_semana.split(',')]
            if hoje in dias:
                already_exists = Pedido.objects.filter(
                    usuario= ag.usuario,
                    marmita = ag.marmita,
                    data_pedido =now.date()
                ).exists()
                